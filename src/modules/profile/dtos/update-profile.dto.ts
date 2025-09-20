import { Expose } from 'class-transformer';
import { IsBoolean, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  headline?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @Expose({ name: 'githubUrl' })
  @IsString()
  githubUsername?: string;

  @IsOptional()
  @Expose({ name: 'linkedinUrl' })
  @IsString()
  linkedinUsername?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  websiteUrl?: string;

  @IsOptional()
  @IsBoolean()
  availableForOpportunities?: boolean;
}
