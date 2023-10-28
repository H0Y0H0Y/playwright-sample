import { mergeTests } from "@playwright/test";
import { test as signupTest } from "fixtures/signup.fixture";

export const test = mergeTests(signupTest);