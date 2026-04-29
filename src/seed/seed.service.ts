import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { AxiosAdapter } from '../common/adapter/axios.adapter';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany({});

    const { results } = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=1000',
    );

    const pokemonToInsert: { name: string; no: number }[] = results.map(
      ({ name, url }) => {
        const segments = url.split('/');
        const no: number = +segments[segments.length - 2];
        return { name, no };
      },
    );

    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed executed successfully.';
  }
}