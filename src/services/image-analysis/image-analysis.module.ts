import { Module } from '@nestjs/common';
import { ImageAnalysisController } from './image-analysis.controller';
import { ImageAnalysisService } from './image-analysis.service';

@Module({
  controllers: [ImageAnalysisController],
  providers: [ImageAnalysisService]
})
export class ImageAnalysisModule {}
