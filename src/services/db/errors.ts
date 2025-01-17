export class DatabaseError extends Error {
  constructor(message: string, public originalError?: unknown) {
    super(message);
    this.name = 'DatabaseError';
  }
}

export class DatabaseConnectionError extends DatabaseError {
  constructor(originalError?: unknown) {
    super('データベースへの接続に失敗しました', originalError);
    this.name = 'DatabaseConnectionError';
  }
}

export class DatabaseOperationError extends DatabaseError {
  constructor(operation: string, originalError?: unknown) {
    super(`データベース操作に失敗しました: ${operation}`, originalError);
    this.name = 'DatabaseOperationError';
  }
}