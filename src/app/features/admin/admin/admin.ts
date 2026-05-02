import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService, Product } from '../../../core/services/products';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.scss']
})
export class AdminComponent implements OnInit {
  products: Product[] = [];
  loading = false;
  saving = false;
  imageUploading = false;
  showForm = false;
  editingId: string | null = null;
  previewUrl: string | null = null;
  successMsg = '';

  ranks = ['S+', 'S', 'A', 'B', 'C', 'D'];
  profiles = [
    { id: 'josue',    label: 'Josué' },
    { id: 'dafyanie', label: 'Dafyanie' }
  ];

  form: Product = this.emptyForm();

  constructor(
    private productsService: ProductsService,
    private auth: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() { this.loadProducts(); }

  emptyForm(): Product {
    return {
      title: '',
      description: '',
      purchase_url: '',
      price: 0,
      rank: 'A',
      image_url: '',
      profile_id: 'josue'
    };
  }

  async loadProducts() {
    this.loading = true;
    this.cdr.detectChanges();
    this.products = await this.productsService.getAll();
    this.loading = false;
    this.cdr.detectChanges();
  }

  openCreate() {
    this.form = this.emptyForm();
    this.editingId = null;
    this.previewUrl = null;
    this.showForm = true;
  }

  openEdit(p: Product) {
    this.form = { ...p };
    this.editingId = p.id ?? null;
    this.previewUrl = p.image_url ?? null;
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.editingId = null;
    this.previewUrl = null;
  }

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
      this.previewUrl = e.target?.result as string;
      this.cdr.detectChanges();
    };
    reader.readAsDataURL(file);

    this.imageUploading = true;
    this.cdr.detectChanges();
    try {
      this.form.image_url = await this.productsService.uploadImage(file);
    } catch (e) {
      console.error(e);
    }
    this.imageUploading = false;
    this.cdr.detectChanges();
  }

  onDragOver(e: DragEvent) { e.preventDefault(); }

  async onDrop(e: DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer?.files[0];
    if (!file) return;
    const fakeEvent = { target: { files: [file] } } as any;
    await this.onFileSelected(fakeEvent);
  }

  async save() {
    if (!this.form.title || !this.form.profile_id) return;
    this.saving = true;
    try {
      if (this.editingId) {
        await this.productsService.update(this.editingId, this.form);
      } else {
        await this.productsService.create(this.form);
      }
      this.successMsg = this.editingId ? '¡Producto actualizado! ✨' : '¡Producto creado! 🎉';
      this.cdr.detectChanges();
      setTimeout(() => {
        this.successMsg = '';
        this.cdr.detectChanges();
      }, 3000);
      this.closeForm();
      await this.loadProducts();
    } catch (e) {
      console.error(e);
    }
    this.saving = false;
    this.cdr.detectChanges();
  }

  async deleteProduct(id: string) {
    if (!confirm('¿Eliminar este producto?')) return;
    await this.productsService.delete(id);
    await this.loadProducts();
  }

  rankColor(rank: string): string {
    const map: Record<string, string> = {
      'S+': '#ff6b9d', 'S': '#ff9a9e', 'A': '#ffd89b',
      'B': '#a8edea', 'C': '#b8c6db', 'D': '#d1d5db'
    };
    return map[rank] ?? '#eee';
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/admin/login']);
  }
}