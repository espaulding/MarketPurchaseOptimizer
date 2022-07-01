import LostArkMath from '../calculations/Stats.js'

function powerSet(list, sizeDesired) {
    var set = [],
        listSize = list.length,
        combinationsCount = (1 << listSize),
        combination;

    for (var i = 1; i < combinationsCount; i++ ) { // loop over all the possible combinations
      combination = []; // start with a fresh combination for this loop
      for (var j = 0; j < listSize; j++){ // check every element in the list
          if ((i & (1 << j))){      // is the list[j] part of combination i?   
                                    // if bitwise and of i and (1 left shifted j times) is 0 skip this element
              combination.push(list[j]);
          }
      }
      if(combination.length === sizeDesired) { // only interested combinations of a specific length
          set.push(combination);
      }
    }

    return set;
};

const optimizeBuild = (props) => {
  var results = [];
  var inventorySize = props.data.possibleEngravings.length + props.data.lockedEngravings.length;
  var buildLimit = (inventorySize < props.data.buildLimit) ? inventorySize : props.data.buildLimit;
  var sizeDesired = buildLimit - props.data.lockedEngravings.length;

  // get all the build combinations we want out of the possible engravings chosen
  var combinations = powerSet(props.data.possibleEngravings, sizeDesired);

  // add the locked engravings to every build combination
  combinations.forEach(r => { r.push(...props.data.lockedEngravings); });

  // compute the dps gain for each build
  combinations.forEach(
    e => { results.push(
      {
        dpsGain: (LostArkMath.computeBaseDmgEngrave(props.data, e) / LostArkMath.computeBaseDmg(props.data)) - 1,
        engravings: e
      }
    )}
  );

  //put the results in order
  results.sort((a,b) => a.dpsGain > b.dpsGain ? -1 : 1);

  //cut the results down to size if we have more than requested
  if (results.length > props.numResults) { results = results.slice(0, props.numResults); }

  //take the top 10 results and then set them
  props.setOptimizerResults(results);
};

const optimizeBuildAsync = (props) => {
  return new Promise(resolve => {
    optimizeBuild(...props);
    resolve('resolved');
    if(props.completeCallback !== undefined && props.completeCallback instanceof Function) {
      props.completeCallback();
    }
  });
}

export { optimizeBuild, optimizeBuildAsync };