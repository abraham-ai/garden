interface Config {
  height: number;
  width: number;
  guidance_scale: number;
  init_image_data: string;
  init_image_strength: number;
  n_samples: number;
  sampler: string;
  seed: number;
  steps: number;
  stream: boolean;
  stream_every: number;
  text_input: string;
  uc_text: boolean;
  upscale_f: number;
}

export default Config;
