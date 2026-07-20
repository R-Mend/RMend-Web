const config = { apiUrl: process.env.NEXT_PUBLIC_API_URL };

function acceptUserRequest(userId: string): Promise<any> {
    return Promise.resolve();
}

function updateUsersAccessLevel(userId: string, accessLevel: string): Promise<any> {
    return Promise.resolve();
}

async function handleResponse(response: Response): Promise<any> {
    return response.text().then((text) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                console.log("NOT LOGGED IN");
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

export const userService = {
    acceptUserRequest,
    updateUsersAccessLevel,
};
