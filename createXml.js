async function fetchDomains(url) {
  let res = await fetch(url, { mode: "no-cors" });
  let data = await res.text();
  let rows = data.replace(/\n/gi, ",").split(",");
  let dataRows = []; // domains
  let cleandata = [];
  let result = [];
  rows.forEach(row => {
    row = row.replace(/  /gi, " ").replace(/ /gi, ",");
    dataRows.push(row);
  });
  dataRows.forEach(s => {
    let d = s.split(",");
    cleandata = d.filter(roww => {
      return roww != "";
    });
    //   console.log(cleandata);
    result.push(cleandata);
  });
  return result;
}
let createDomains = async (domainsElem, url) => {
  let data = await fetchDomains(url);
  //   console.log(data);
  domainsElem.setAttribute("nbDomains", data.length - 1);

  for (let i = 0; i < data.length - 1; i++) {
    let element = data[i];
    let nbValuesDomains = element[1];
    element = element.slice(1, element.length);
    domainsValues = element;
    element = element.join(",").replace(/,/gi, " ");
    // console.log(element);
    let domainElem = doc.createElement("domain");
    domainElem.textContent = domainsValues
      .join(",")
      .replace(/,/gi, " ")
      .slice(2, element.length);
    domainElem.setAttribute("name", `grp_${i + 1}`);
    domainElem.setAttribute("nbValues", nbValuesDomains);
    domainsElem.appendChild(domainElem);
    // console.log(element);
  }
  instanceElem.appendChild(domainsElem);
};
async function fetchVars_and_Consts(url) {
  let dataRows_vars = [];
  let result = [];
  let res = await fetch(url, { mode: "no-cors" });
  let data = await res.text();
  let rows = data.replace(/\n/gi, ",").split(",");
  let nbVariables = rows.length;
  rows = rows.map(row => {
    return row.replace(/  /gi, ",").replace(/ /gi, ",");
  });
  rows.forEach(row => {
    row = row.split(",");
    // console.log(row);
    dataRows_vars.push(row);
  });
  dataRows_vars.forEach(dataRow => {
    // console.log(dataRow);
    dataRow = dataRow.filter(r => r != "");
    // console.log(dataRow);
    result.push(dataRow);
  });
  return result;
}
let createVariables = async (variablesElem, url, agentsElem) => {
  let data = await fetchVars_and_Consts(url);
  //   console.log(data);
  variablesElem.setAttribute("nbVariables", data.length - 1);
  agentsElem.setAttribute("nbAgents", data.length - 1);
  for (let i = 0; i < data.length - 1; i++) {
    let element = data[i];
    let variableElem = doc.createElement("variable");
    variableElem.setAttribute("name", `VAR${data[i][0]}`);
    variableElem.setAttribute("domain", `grp_${data[i][1]}`);
    variableElem.setAttribute("agent", `agent${data[i][0]}`);
    variablesElem.appendChild(variableElem);

    let agentElem = doc.createElement("agent");
    agentElem.setAttribute("name", `agent${data[i][0]}`);
    agentsElem.appendChild(agentElem);
  }
  instanceElem.appendChild(agentsElem);
  instanceElem.appendChild(variablesElem);
};
let createPredicates = async predicatesElem => {
  predicatesElem.setAttribute("nbPredicates", 2);
  let predicateElem_gt = doc.createElement("predicate");
  predicateElem_gt.setAttribute("name", "gt");
  let parametersElem = doc.createElement("parameters");
  parametersElem.textContent = "int X1 int X2 int K int C";
  let expressionElem = doc.createElement("expression");
  let functionalElem = doc.createElement("functional");
  functionalElem.textContent = "mul(sub(abs(sub(X1, X2)), K), C)";
  expressionElem.appendChild(functionalElem);
  predicateElem_gt.appendChild(parametersElem);
  predicateElem_gt.appendChild(expressionElem);

  let predicateElem_eq = doc.createElement("predicate");
  predicateElem_eq.setAttribute("name", "eq");
  let parametersElem2 = doc.createElement("parameters");
  parametersElem2.textContent = "int X1 int X2 int K int C";
  let expressionElem2 = doc.createElement("expression");
  let functionalElem2 = doc.createElement("functional");
  functionalElem2.textContent =
    "mul(add(abs(sub(abs(sub(X1, X2)), K)), 1), C)</";
  expressionElem2.appendChild(functionalElem2);
  predicateElem_eq.appendChild(parametersElem2);
  predicateElem_eq.appendChild(expressionElem2);

  predicatesElem.appendChild(predicateElem_gt);
  predicatesElem.appendChild(predicateElem_eq);
  instanceElem.appendChild(predicatesElem);
};

let createConstraints = async (constraintsElem, url) => {
  let data = await fetchVars_and_Consts(url);
  // console.log(data);
  constraintsElem.setAttribute("nbConstraints", data.length - 1);
  for (let i = 0; i < data.length - 1; i++) {
    let element = data[i];

    let constraintElem = doc.createElement("constraint");
    if (data[i][3] == "=") {
      constraintElem.setAttribute(
        "name",
        `VAR${data[i][0]}_VAR${data[i][1]}_eq_${data[i][4]}`
      );
      constraintElem.setAttribute("reference", "eq");
    } else if (data[i][3] == ">") {
      constraintElem.setAttribute(
        "name",
        `VAR${data[i][0]}_VAR${data[i][1]}_gt_${data[i][4]}`
      );
      constraintElem.setAttribute("reference", "gt");
    }

    constraintElem.setAttribute("arity", 2);
    constraintElem.setAttribute("scope", `VAR${data[i][0]} VAR${data[i][1]}`);
    let parametersElem = doc.createElement("parameters");
    parametersElem.textContent =`VAR${data[i][0]} VAR${data[i][1]} ${data[i][4]} 0`;
    constraintElem.appendChild(parametersElem);
    constraintsElem.appendChild(constraintElem);

    let agentElem = doc.createElement("agent");
    agentElem.setAttribute("name", `agent${data[i][0]}`);
    agentsElem.appendChild(agentElem);
  }
  instanceElem.appendChild(constraintsElem);
};

let doc = document.implementation.createDocument("", "", null);
let instanceElem = doc.createElement("instance");
let domainsElem = doc.createElement("domains");
let variablesElem = doc.createElement("variables");
let agentsElem = doc.createElement("agents");
let predicatesElem = doc.createElement("predicates");
let constraintsElem = doc.createElement("constraints");

// create variables and agents tags
createVariables(
  variablesElem,
  "./FullRLFAP/FullRLFAP/CELAR/scen01/var.txt",
  agentsElem
);

createDomains(domainsElem, "./FullRLFAP/FullRLFAP/CELAR/scen01/dom.txt");
createPredicates(predicatesElem);
createConstraints(
  constraintsElem,
  "./FullRLFAP/FullRLFAP/CELAR/scen01/ctr.txt"
);

doc.appendChild(instanceElem);
console.log(doc);
// algos: DPOPJACOP MGMJACOP 3 4 5