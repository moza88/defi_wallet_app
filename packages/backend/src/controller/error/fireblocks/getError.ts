export const getError = (e: any) => {
    return {
        status: e.response.status,
        statusText: e.response.statusText,
        message: e.response.data.message,
        code: e.response.data.code,
    };
}