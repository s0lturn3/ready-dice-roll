export interface ApiResponse<T> {
   error: boolean;         // Indica se houve erro
   errorMessage?: string;  // Mensagem de erro (opcional, só em caso de erro)
   body?: T;            // Dados retornados pela API
   metadata?: any;         // Metadados adicionais (opcional)
}
