import axios from "axios";
import { API_URL } from "../const";
import { LocalStorageService } from "./LocalStorageService";

const keyServices = new LocalStorageService();

export class ApiService {
    #apiUrl = API_URL;
    accessKey = keyServices.get();

    async getAccessKey() {
        try {
            if (!this.accessKey) {
                const response = await axios.get(
                    `${this.#apiUrl}/api/users/accessKey`
                );
                this.accessKey = keyServices.set(response.data.accessKey);
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    async getData(pathname, params = {}) {
        if (!this.accessKey) {
            await this.getAccessKey();
        }
        try {
            const response = await axios.get(`${this.#apiUrl}/${pathname}`, {
                headers: {
                    Authorization: `Bearer ${this.accessKey}`,
                },
                params,
            });

            return response.data;
        } catch (err) {
            if (err.response && err.response.status === 401) {
                this.accessKey = keyServices.delete("koff-accessKey");

                return this.getData(pathname, params);
            } else {
                console.error(err.message);
            }
        }
    }

    // async getProducts(page = 1, limit = 12, list, category, search) {
    //   return await this.getData('api/products', { page, limit, list, category, search });
    // }

    async getProducts(params = {}) {
        if (params.list) {
            params.list = params.list.join(",");
        }
        return await this.getData("api/products", params);
    }

    async getProductCategories() {
        return await this.getData("api/productCategories");
    }

    async getProductById(id) {
        return await this.getData(`api/products/${id}`);
    }
}
