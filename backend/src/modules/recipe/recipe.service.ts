import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { ItemService } from '../item/item.service';
import * as FormData from 'form-data';
@Injectable()
export class RecipeService {
    constructor(private readonly httpService: HttpService, private readonly itemService: ItemService) { }

    async getRecommendations(lang: string, inputFeatures: any, listIngredients: string[]): Promise<any> {
        const pythonApiUrl = process.env.API_RECOMMEND_LINK;

        // Tạo dữ liệu cần gửi đến API Python
        const data = {
            input_features: inputFeatures,
            list_ingredients: listIngredients,
        };

        try {
            // Gửi POST request đến API Python
            const response = await lastValueFrom(this.httpService.post(pythonApiUrl, data));
            // return response.data;
            return this.itemService.getListItemsByIds(lang, response.data);
        } catch (error) {
            const axiosError = error as AxiosError; // Chuyển đổi kiểu error
            console.error('Python API error details:', axiosError.response?.data); // In ra chi tiết lỗi
            console.error('Error message:', axiosError.message);                   // In thông báo lỗi
            throw new Error(`Error calling Python API: ${axiosError.message}`);
            // throw new Error(`Error calling Python API`);
        }
    }

    async getRecognition(lang: string, file: Express.Multer.File): Promise<any> {
        const pythonApiUrl = process.env.API_RECOGNIZE_LINK;

        // Tạo form-data chứa file ảnh
        const formData = new FormData();
        formData.append('file', file.buffer, file.originalname); // Dùng buffer của file thay vì filepath

        try {
            // Gửi POST request đến API Python với form-data chứa file ảnh
            const response = await lastValueFrom(
                this.httpService.post(pythonApiUrl, formData, {
                    headers: formData.getHeaders(),
                })
            );

            // Giả sử API Python trả về danh sách ID sau khi xử lý ảnh
            // return response.data;
            return this.itemService.getItemByName(lang, response.data['prediction'])
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error('Python API error details:', axiosError.response?.data);
            console.error('Error message:', axiosError.message);
            throw new Error(`Error calling Python API: ${axiosError.message}`);
        }
    }
}
