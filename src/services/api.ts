const BASE_URL = "https://panda-market-api.vercel.app";

// GET API Layer
async function GET(URL: string) {
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Failed to get data : ", error);
    throw error;
  }
}

// 상품 리스트 조회
export async function getProducts(params = {}) {
  const query = new URLSearchParams(params).toString();
  return await GET(`${BASE_URL}/products?${query}`);
}

// 상품 상세 정보 조회
export async function getProductDetail(productId: string | undefined) {
  return await GET(`${BASE_URL}/products/${productId}`);
}

// 상품별 댓글 조회
export async function getComments(productId: string | undefined) {
  return await GET(`${BASE_URL}/products/${productId}/comments?limit=3`);
}
