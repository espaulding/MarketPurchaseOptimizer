import LostArkMath from '../calculations/Stats.js'

function powerSet(list, sizeDesired) {
    var set = [],
        listSize = list.length,
        combinationsCount = (1 << listSize),
        combination;

    for (var i = 1; i < combinationsCount ; i++ ){
        combination = [];
        for (var j=0;j<listSize;j++){
            if ((i & (1 << j))){
                combination.push(list[j]);
            }
        }
        if(combination.length === sizeDesired) {
            set.push(combination);
        }
    }
    return set;
}

const optimizeBuild = (props) => {
  var results = [];

  // get all the build combinations we want out of the possible engravings chosen
  var combinations = powerSet(props.possibleEngravings, props.buildLimit - props.lockedEngravings.length);

  // add the locked engravings to every build combination
  combinations.forEach(r => { r.push(...props.lockedEngravings); });

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

  //take the top 10 results and then set them
  props.setOptimizerResults(results.slice(0, props.numResults));
}

export { optimizeBuild };