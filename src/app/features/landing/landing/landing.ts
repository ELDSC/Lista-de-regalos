import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService, Product } from '../../../core/services/products';

type Rank = 'S+' | 'S' | 'A' | 'B' | 'C' | 'D';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.html',
  styleUrls: ['./landing.scss']
})
export class LandingComponent implements OnInit {
  activeProfile: 'josue' | 'dafyanie' = 'josue';
  products: Product[] = [];
  loading = true;

  ranks: Rank[] = ['S+', 'S', 'A', 'B', 'C', 'D'];

  get currentEmojis(): string[] {
    return this.activeProfile === 'josue'
      ? ['🐈', '👨‍💻', '📱', '💾', '🎮', '🔫', '🎁', '💖', '🕹️', '🍔', '🧸', '💻'] 
      : ['🌸', '💕', '⭐', '🎀', '🌷', '✨', '🍓', '🎁', '💖', '🌺', '🦋', '🍡'];
  }

  rankMeta: Record<Rank, { label: string; color: string; bg: string; emoji: string }> = {
    'S+': { label: 'S+', color: '#fff',    bg: 'var(--primary)', emoji: '👑' },
    'S':  { label: 'S',  color: '#fff',    bg: 'var(--primary-light)', emoji: '✨' },
    'A':  { label: 'A',  color: '#7b3f00', bg: '#ffd89b', emoji: '🌟' },
    'B':  { label: 'B',  color: '#00574b', bg: '#a8edea', emoji: '💎' },
    'C':  { label: 'C',  color: '#3a3a5c', bg: '#c5cae9', emoji: '🎀' },
    'D':  { label: 'D',  color: '#444',    bg: '#e0e0e0', emoji: '🛍️' },
  };

  constructor(
    private productsService: ProductsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() { this.loadProducts(); }

  async loadProducts() {
    this.loading = true;
    this.cdr.detectChanges();
    this.products = await this.productsService.getByProfile(this.activeProfile);
    this.loading = false;
    this.cdr.detectChanges();
  }

  switchProfile(profile: 'josue' | 'dafyanie') {
    this.activeProfile = profile;
    this.loadProducts();
  }

  byRank(rank: Rank): Product[] {
    return this.products.filter(p => p.rank === rank);
  }

  hasProducts(rank: Rank): boolean {
    return this.byRank(rank).length > 0;
  }
}