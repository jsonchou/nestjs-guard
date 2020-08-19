import { IsInt, IsString, IsDate } from 'class-validator';

export class CreateCatDto {

  @IsInt()
  readonly id: number

  @IsString()
  readonly name: string;

  @IsInt()
  readonly age: number;

  @IsString()
  readonly breed: string;

  @IsDate()
  readonly adoptionDate: Date;
}
