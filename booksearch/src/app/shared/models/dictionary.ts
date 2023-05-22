import { Meaning } from './meaning';
import { Phonetic } from './phonetic';

export interface Dictionary {
  word: string;
  meanings: Meaning[];
  phonetics : Phonetic;
}