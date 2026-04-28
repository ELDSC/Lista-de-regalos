import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../../src/environments/enviroment';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  public client: SupabaseClient;
  public adminClient: SupabaseClient;

  constructor() {
    this.client = createClient(
      environment.supabaseUrl,
      environment.supabaseAnonKey
    );
    this.adminClient = createClient(
      environment.supabaseUrl,
      environment.supabaseServiceKey
    );
  }
}