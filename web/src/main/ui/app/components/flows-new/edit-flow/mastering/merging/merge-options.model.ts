import { Merging } from "./merging.model";

/**
 * Represents a set of merge options for UI display.
 */
export class MergeOptions {
  public options: Array<MergeOption> = [];

  /**
   * Construct merge options based on a JSON merging configuration.
   */
  static fromMerging(merging: Merging) {
    const result = new MergeOptions();
    const algs = merging.algorithms['custom'];
    const strategies = merging.mergeStrategies;
    if (merging.merging) {
      merging.merging.forEach(mOpt => {
        result.options.push(MergeOption.fromMerging(mOpt, algs, strategies));
      })
    }
    return result;
  }

  /**
   * Add a new match option to the set.
   */
  addOption(opt) {
    this.options.push(new MergeOption(opt));
  }

  /**
   * Update a match option in the set.
   */
  updateOption(opt, index) {
    let mOpt = new MergeOption(opt);
    this.options.splice(index, 1, mOpt);
  }

  /**
   * Delete a match option from the set.
   */
  deleteOption(opt) {
    let i = this.options.findIndex(o => {
      return o === opt;
    })
    if (i >= 0) {
      this.options.splice(i, 1);
    }
  }

}

/**
 * Represents a merge option for UI display.
 */
export class MergeOption {
  public propertyName: Array<string>;
  public algorithmRef: string;
  public maxValues: number;
  public maxSources: number;
  public sourceWeights: string;
  public length: string;
  public strategy: string;
  public customUri: string;
  public customFunction: string;

  constructor (mOpt: any = {}) {
    if (mOpt.propertyName) this.propertyName = [mOpt.propertyName];
    if (mOpt.algorithmRef) this.algorithmRef = mOpt.algorithmRef;
    if (mOpt.maxValues) this.maxValues = mOpt.maxValues;
    if (mOpt.maxSources) this.maxSources = mOpt.maxSources;
    if (mOpt.sourceWeights) this.sourceWeights = mOpt.sourceWeights;
    if (mOpt.length) this.length = mOpt.length;
    if (mOpt.strategy) this.strategy = mOpt.strategy;
    if (mOpt.customUri) this.customUri = mOpt.customUri;
    if (mOpt.customFunction) this.customFunction = mOpt.customFunction;
  }

  /**
   * Construct a merge option from merging configuration data.
   */
  static fromMerging(mOpt: any, algs: any, strategies: any) {
    let result;
    if (mOpt.strategy !== undefined) {
      // Handle strategy type
      let strategy = strategies.find(s => {
        return s.name === mOpt.strategy;
      });
      result = new MergeOption(strategy);
      result.propertyName = mOpt.propertyName;
      result.strategy = mOpt.strategy;
    } else if (mOpt.algorithmRef !== undefined) {
      // Handle custom type
      result = new MergeOption(mOpt);
      let alg = algs.find(a => {
        return a.name === mOpt.algorithmRef;
      });
      if (alg.at) result.customUri = alg.at;
      if (alg.function) result.customFunction = alg.function;
    } else {
      // Handle standard type
      result = new MergeOption(mOpt);
    }
    return result;
  }

}