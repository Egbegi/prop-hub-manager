
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Tables, TablesInsert } from '@/integrations/supabase/types';

type MaintenanceRequest = Tables<'maintenance_requests'>;
type MaintenanceRequestInsert = TablesInsert<'maintenance_requests'>;

export const useMaintenanceRequests = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: maintenanceRequests,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['maintenance-requests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('maintenance_requests')
        .select(`
          *,
          tenants (
            full_name,
            email
          ),
          units (
            unit_number,
            properties (
              name
            )
          )
        `)
        .order('submitted_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const createMaintenanceRequest = useMutation({
    mutationFn: async (request: Omit<MaintenanceRequestInsert, 'id' | 'submitted_at'>) => {
      const { data, error } = await supabase
        .from('maintenance_requests')
        .insert(request)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenance-requests'] });
      toast({
        title: "Success",
        description: "Maintenance request submitted successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateMaintenanceRequest = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<MaintenanceRequest> }) => {
      const { data, error } = await supabase
        .from('maintenance_requests')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenance-requests'] });
      toast({
        title: "Success",
        description: "Maintenance request updated successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    maintenanceRequests,
    isLoading,
    error,
    createMaintenanceRequest,
    updateMaintenanceRequest,
  };
};
