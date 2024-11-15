import { getServerSession } from "next-auth";
import { authOptions, CustomSession } from "@/app/api/auth/[...nextauth]/route";
const defaultBaseUrl = "https://maintenancesystembc-production.up.railway.app/api/v1"

export class HttpClient {
    private baseUrl: string;

    constructor(baseUrl?: string) {
        this.baseUrl = baseUrl || defaultBaseUrl;
    }

    private async getHeader() {
        const session = await getServerSession(authOptions) as CustomSession;
        const token = session?.user?.token;

        return {
            ...(token && { Authorization: `Bearer ${token}` })
        }
    }

    private async handleResponse(response: Response) {
        if (!response.ok) {
            const errorData = await response.json();
            throw errorData;
        }
        return await response.json();
    }

    async get<T>(url: string): Promise<T> {
        const headers = await this.getHeader();
        const response = await fetch(`${this.baseUrl}/${url}`, {
            headers: {
                ...headers,
                "Content-Type": "application/json",
            },
            method: "GET",
            cache: "no-store"
        });
        return this.handleResponse(response);
    }

    async delete(url: string): Promise<void> {
        const headers = await this.getHeader();
        await fetch(`${this.baseUrl}/${url}`, {
            headers: headers,
            method: "DELETE",
        });
    }

    async post<T, B>(url: string, body: B): Promise<T> {
        const headers = await this.getHeader();
        const response = await fetch(`${this.baseUrl}/${url}`, {
            headers: {
                ...headers,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(body),
        });
        return this.handleResponse(response);
    }

    async patch<T, B>(url: string, body: B): Promise<T> {
        const headers = await this.getHeader();
        const response = await fetch(`${this.baseUrl}/${url}`, {
            headers: {
                ...headers,
                "Content-Type": "application/json",
            },
            method: "PATCH",
            body: JSON.stringify(body),
        });
        return this.handleResponse(response);
    }



    async getFile(url: string): Promise<Blob> {
        const headers = await this.getHeader();
        const response = await fetch(`${this.baseUrl}/${url}`, {
            headers: headers,
            method: "GET",
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw errorData;
        }

        return await response.blob();
    }
}