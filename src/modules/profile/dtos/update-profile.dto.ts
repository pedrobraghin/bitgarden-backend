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
  @IsString()
  githubUsername?: string;

  @IsOptional()
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
