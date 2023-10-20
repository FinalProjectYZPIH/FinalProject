import { Outlet } from "react-router-dom";
import ToastProvider from "./ToastProvider"; //für notificaiton toast
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
 //für fetchVerwaltung
//Hier finden Sie alle Wrapper für die gesamte App.
export function AppWrapper() {
  const queryClient = new QueryClient({defaultOptions:{
    queries:{
      cacheTime: 1000 * 60 * 10, // Daten werden 10 Minuten im Cache aufbewahrt
    }
  }})
  return (
    <ToastProvider> 
      <QueryClientProvider client={queryClient}>
        <Outlet />
        <ReactQueryDevtools initialIsOpen={true}/>
      </QueryClientProvider>
    </ToastProvider>
  );
}
