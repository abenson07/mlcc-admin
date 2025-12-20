import { updateSession } from '@/src/lib/auth'
import { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/360b22a7-0c2d-4c5c-a82f-2bf8b2f66ab9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'middleware.ts:5',message:'middleware entry',data:{pathname:request.nextUrl.pathname,url:request.url,nodeEnv:process.env.NODE_ENV},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion
  const response = await updateSession(request);
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/360b22a7-0c2d-4c5c-a82f-2bf8b2f66ab9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'middleware.ts:9',message:'middleware exit',data:{pathname:request.nextUrl.pathname,status:response.status},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

