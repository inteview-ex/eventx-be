import {
  Injectable,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Nomics from "nomics";

@Injectable()
export class NomicsService
{
  constructor(private readonly configService: ConfigService) {}
  private readonly nomic_api_token =
    this.configService.get<string>('NOMICS_API_KEY')

  private readonly nomicsClient = new Nomics({
    apiKey: this.nomic_api_token
  });

  getNomicsClient() {
    return this.nomicsClient
  }
}
