export interface ApiResponse<T> {
   code: number;           // Código de status da resposta
   error: boolean;         // Indica se houve erro
   errorMessage?: string;  // Mensagem de erro (opcional, só em caso de erro)
   body?: T;               // Dados retornados pela API
   metadata?: any;         // Metadados adicionais (opcional)
}
