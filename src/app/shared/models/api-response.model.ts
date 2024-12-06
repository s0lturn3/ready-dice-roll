interface ApiResponse<T> {
   error: boolean;         // Indica se houve erro
   errorMessage?: string;  // Mensagem de erro (opcional, só em caso de erro)
   response: T;            // Dados retornados pela API
   metadata?: any;         // Metadados adicionais (opcional)
}