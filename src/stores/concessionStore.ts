import { create } from 'zustand';
import { supabase } from '../lib/supabaseClient';
import { Concession } from '../types/concession';

interface ConcessionState {
  concessions: Concession[];
  selectedConcession: Concession | null;
  loading: boolean;
  error: string | null;
  fetchConcessions: () => Promise<void>;
  setSelectedConcession: (concession: Concession | null) => void;
}

export const useConcessionStore = create<ConcessionState>((set) => ({
  concessions: [],
  selectedConcession: null,
  loading: false,
  error: null,
  fetchConcessions: async () => {
    set({ loading: true, error: null });
    try {
      // Check if we're using demo credentials
      const isDemoMode = !import.meta.env.VITE_SUPABASE_URL || 
                        import.meta.env.VITE_SUPABASE_URL === 'https://demo.supabase.co';
      
      if (isDemoMode) {
        // Return mock data for demo mode
        const mockConcessions = [
          {
            id: 'demo-1',
            user_id: 'demo-user',
            name: 'Concesión Demo Norte',
            rut: '76.123.456-7',
            manager: 'Juan Pérez',
            phone: '+56 9 8765 4321',
            email: 'jperez@demo.com',
            established: '2020',
            address: 'Sector Norte, Puerto Montt',
            location: 'Los Lagos, Chile',
            water_body: 'Seno de Reloncaví',
            total_area: '15.5 ha',
            max_depth: '45m',
            latitude: -41.4695,
            longitude: -72.9412,
            license: 'AC-2020-001',
            operational_status: 'Activa',
            certifications: ['ASC', 'BAP'],
            environmental_permits: ['RCA N° 123/2020'],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ];
        
        set({ concessions: mockConcessions, loading: false });
        set({ selectedConcession: mockConcessions[0] });
        return;
      }
      
      const { data, error } = await supabase
        .from('concessions')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        throw error;
      }
      
      set({ concessions: data || [], loading: false });
      // Automatically select the first concession if available
      if (data && data.length > 0) {
        set({ selectedConcession: data[0] });
      }

    } catch (error: any) {
      console.warn('Supabase fetch failed, using demo mode:', error.message);
      // Fallback to demo data on error
      const mockConcessions = [
        {
          id: 'demo-1',
          user_id: 'demo-user',
          name: 'Concesión Demo Norte',
          rut: '76.123.456-7',
          manager: 'Juan Pérez',
          phone: '+56 9 8765 4321',
          email: 'jperez@demo.com',
          established: '2020',
          address: 'Sector Norte, Puerto Montt',
          location: 'Los Lagos, Chile',
          water_body: 'Seno de Reloncaví',
          total_area: '15.5 ha',
          max_depth: '45m',
          latitude: -41.4695,
          longitude: -72.9412,
          license: 'AC-2020-001',
          operational_status: 'Activa',
          certifications: ['ASC', 'BAP'],
          environmental_permits: ['RCA N° 123/2020'],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
      
      set({ concessions: mockConcessions, loading: false, error: null });
      set({ selectedConcession: mockConcessions[0] });
    }
  },
  setSelectedConcession: (concession) => {
    set({ selectedConcession: concession });
  },
}));
