import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ElementRef } from '@angular/core';
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
export class LandingComponent implements OnInit, AfterViewInit {
  activeProfile: 'josue' | 'dafyanie' = 'josue';
  products: Product[] = [];
  loading = true;

  ranks: Rank[] = ['S+', 'S', 'A', 'B', 'C', 'D'];

  private observer: IntersectionObserver | null = null;

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
    private cdr: ChangeDetectorRef,
    private el: ElementRef
  ) {}

  ngOnInit() { this.loadProducts(); }

  ngAfterViewInit() {
    if (typeof IntersectionObserver !== 'undefined') {
      this.setupObserver();
    }
  }

  async loadProducts() {
    this.loading = true;
    this.cdr.detectChanges();
    this.products = await this.productsService.getByProfile(this.activeProfile);
    this.loading = false;
    this.cdr.detectChanges();
    setTimeout(() => this.setupObserver(), 100);
  }

  switchProfile(profile: 'josue' | 'dafyanie') {
    this.activeProfile = profile;
    this.loadProducts();
  }

  setupObserver() {
    this.observer?.disconnect();

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    const cards = this.el.nativeElement.querySelectorAll('.product-card:not(.visible)');
    cards.forEach((card: Element) => this.observer?.observe(card));
  }

  byRank(rank: Rank): Product[] {
    return this.products.filter(p => p.rank === rank);
  }

  hasProducts(rank: Rank): boolean {
    return this.byRank(rank).length > 0;
  }
}