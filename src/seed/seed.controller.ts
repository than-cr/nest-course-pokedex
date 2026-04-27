import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  private readonly axios: AxiosInstance = axios;

  @Get()
  async executeSeed() {
    const { data } = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=1000',
    );

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no: number = +segments[segments.length - 2];
      console.log(name, no);
    });
    return data.results;
  }
}
