import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Lang } from '../../common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post('recommend')
  async recommendRecipes(
    @Lang() lang: string,
    @Body('input_features') inputFeatures: any,
    @Body('list_ingredients') listIngredients: string[]
  ) {
    return await this.recipeService.getRecommendations(
      lang,
      inputFeatures,
      listIngredients
    );
  }

  @Post('recognize')
  @UseInterceptors(FileInterceptor('file')) // Lấy file từ request
  async recognizeImage(
    @Lang() lang: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (!file) {
      return { error: 'No file provided' };
    }

    try {
      const prediction = await this.recipeService.getRecognition(lang, file);
      return prediction; // Trả về kết quả dự đoán
    } catch (error) {
      // return { error: error.message };
      return { error: 'ERROR' };
    }
  }
}
