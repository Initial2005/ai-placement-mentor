import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    models: [
      {
        name: 'tinyllama',
        modified_at: new Date().toISOString(),
        size: 637841961,
        digest: 'fake-digest',
        details: {
          parent_model: '',
          format: 'gguf',
          family: 'llama',
          families: ['llama'],
          parameter_size: '1B',
          quantization_level: 'Q4_0',
        },
      },
      {
        name: 'llama3',
        modified_at: new Date().toISOString(),
        size: 4700000000,
        digest: 'fake-digest-2',
        details: {
          parent_model: '',
          format: 'gguf',
          family: 'llama',
          families: ['llama'],
          parameter_size: '8B',
          quantization_level: 'Q4_0',
        },
      },
    ],
  });
}
