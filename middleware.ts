import { NextRequest, NextResponse } from "next/server";

function parseJWT(token: string) {
    const payload = token.split('.')[1];
    if (!payload) return null;
    const decoded = atob(payload);
    return JSON.parse(decoded);
}

async function verifyToken({ token }: { token: string }) {
    if (!process.env.TOKEN_KEY) {
        return { error: true, message: "Environment variables not set" };
    }
    const decodedToken = parseJWT(token);
    if (!decodedToken) {
        return { message: "Token not valid", error: true };
    }

    return { error: false, message: "Token is valid" };
}

export const middleware = async (req: NextRequest) => {
    if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
        try {
            const token = req.headers.get("token");
            const admin = req.headers.get("admin");
            if (admin === '1') NextResponse.next();
            if (!token || token.trim() === "") {
                return NextResponse.json({
                    message: "Authorization token is missing or invalid",
                    error: true,
                });
            }

            const tokenVerification = await verifyToken({ token });
            if (tokenVerification.error) {
                console.log(tokenVerification);
                return NextResponse.json({
                    error: true,
                    message: tokenVerification.message,
                });
            }
        } catch (error) {
            console.error("Error processing request:", error);
            return NextResponse.json({
                error: true,
                message: "Failed to process request",
            });
        }
    }
    return NextResponse.next();
};

export const config = {
    matcher: ['/api/course', '/api/course/:path*'],
};
