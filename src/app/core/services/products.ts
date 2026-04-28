import { Injectable } from '@angular/core';
import { SupabaseService } from '../services/supabase';

export interface Product {
  id?: string;
  title: string;
  description: string;
  purchase_url: string;
  price: number;
  rank: 'S+' | 'S' | 'A' | 'B' | 'C' | 'D';
  image_url?: string;
  profile_id: string;
  is_purchased?: boolean;
  created_at?: string;
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  constructor(private supabase: SupabaseService) {}

  // Landing: obtener productos por perfil
  async getByProfile(profileId: string): Promise<Product[]> {
    const { data, error } = await this.supabase.adminClient
      .from('products')
      .select('*')
      .eq('profile_id', profileId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data ?? [];
  }

  // Admin: obtener todos
  async getAll(): Promise<Product[]> {
    const { data, error } = await this.supabase.adminClient
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data ?? [];
  }

  // Admin: crear producto
  async create(product: Product): Promise<Product> {
    const { data, error } = await this.supabase.adminClient
      .from('products')
      .insert(product)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Admin: actualizar producto
  async update(id: string, product: Partial<Product>): Promise<void> {
    const { error } = await this.supabase.adminClient
      .from('products')
      .update(product)
      .eq('id', id);

    if (error) throw error;
  }

  // Admin: eliminar producto
  async delete(id: string): Promise<void> {
    const { error } = await this.supabase.adminClient
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // Admin: subir imagen
  async uploadImage(file: File): Promise<string> {
    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}.${ext}`;

    const { error } = await this.supabase.adminClient.storage
      .from('product-images')
      .upload(fileName, file, { upsert: true });

    if (error) throw error;

    const { data } = this.supabase.client.storage
      .from('product-images')
      .getPublicUrl(fileName);

    return data.publicUrl;
  }
}