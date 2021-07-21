let code = {
    skills: {
        topic:"REACT",
        cost:"40$"
    }
}

code.skills.push("REACT");
code.skills.push("REACT");
code.skills.push("REACT");
code.skills.push("REACT");
code.skills.push("REACT");


let b = JSON.stringify(code);

console.log(typeof (b));

let a = JSON.parse(b);
console.log(b);
console.log(a.skills);