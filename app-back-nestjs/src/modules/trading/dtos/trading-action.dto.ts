import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TradingActionDto {
  // Le décorateur IsString vérifie que la valeur de la propriété 'company' est de type chaîne de caractères.
  // Le décorateur IsNotEmpty vérifie que la valeur de la propriété 'company' n'est pas vide.
  @IsString()
  @IsNotEmpty()
  company: string;

  // Le décorateur IsNumber vérifie que la valeur de la propriété 'amount' est de type nombre.
  // Le décorateur IsNotEmpty vérifie que la valeur de la propriété 'amount' n'est pas vide.
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
