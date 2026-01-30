import { Test, TestingModule } from '@nestjs/testing';
import { EnvConfigService } from '../../env-config.service';
import { EnvConfigModule } from '../../env-config.module';

describe('EnvConfigService', () => {
  let service: EnvConfigService; //cria variavel do tipo EnvConfigService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EnvConfigModule.forRoot()],
      providers: [EnvConfigService],
    }).compile(); //cria um modulo a ser usado pela variavel.

    service = module.get<EnvConfigService>(EnvConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the variable PORT', () => {
    expect(service.getAppPort()).toBe(3002); //chamo o método do provider
  });

  it('should be return the ENV', () => {
    expect(service.getNodeEnv()).toBe('test');
  });
});
