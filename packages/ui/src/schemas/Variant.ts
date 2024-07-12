import { z } from "zod";

import { Variant } from "../types";

export const VariantSchema = z.nativeEnum(Variant);
