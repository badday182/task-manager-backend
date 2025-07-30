import { IsBoolean, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsBoolean()
  readonly completed: boolean;
}
