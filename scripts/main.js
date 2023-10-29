function fun_working (funct, classes_of_funct) { // x, y, z - переменные функции; F - значение функции, F_var - массив значений функций
    let x, y, z;
    let oIndex_tab = {};
    let F, F_var = [];
    let str;        // строка для индексов
    let PDNF = "", PCNF = "";
    let class_T0, class_T1, class_S, class_M, class_L;
    let monotony_member = [];
    document.write("Таблица истинности:<br>");
    if (funct.indexOf('z') != -1){
        document.write("X Y Z F<br>");
    } else {
        document.write("X Y F<br>");
    }
    for (x = 0; x <= 1; x++){
        for (y = 0; y <= 1; y++){
            if (funct.includes('z') != false){
                for (z = 0; z <= 1; z++){
                    count = 1;          // count - 1 - СДНФ, 0 - СКНФ;
                    F = eval(funct) + 0;
                    document.write(x + " " + y + " " + z + " " + F + "<br>");
                    PDNF = PDNF + create_PNF(F, count, x, y, z);
                    count--;
                    PCNF = PCNF + create_PNF(F, count, x, y, z);
                    
                    str = "a";
                    str = str_generation(str, x, y, z);
                    oIndex_tab[str] = str;
                    F_var.push(F); 

                    class_S = checing_self_duality1(funct, F, !x, !y, !z);
                    //class_S = checing_self_duality2(funct, x, y, z);
                    monotony_member.push([x, y, z, F]);
                }
            } else {
                count = 1;
                F = eval(funct) + 0;
                document.write(x + " " + y + " " + F + "<br>");
                PDNF = PDNF + create_PNF(F, count, x, y,);
                count--;
                PCNF = PCNF + create_PNF(F, count, x, y,);
                
                str = "a";
                str = str_generation(str, x, y,);
                oIndex_tab[str] = str;
                F_var.push(F);

                class_S = checing_self_duality1(funct, F, !x, !y, );
                //class_S = checing_self_duality2(funct, x, y, );
                monotony_member.push([x, y, z, F]);
            }
        }
    }  
    PDNF = PDNF.slice(0, PDNF.length - 1);
    PCNF = PCNF.slice(0, PCNF.length - 1);
    
    if (PDNF.length) {
        document.write("СДНФ: " + PDNF + "<br>");
        funct_checking(PDNF, F_var);
    } else {
        document.write("Нет СДНФ.<br>"); 
    }
    
    if (PCNF.length) {
        document.write("СКНФ: " + PCNF + "<br>");
        funct_checking(PCNF, F_var);
    } else {
        document.write("Нет СКНФ.<br>");
    }


    index_calcul(F_var, oIndex_tab);

    let Zheg_pol = create_Zhegalkin_polynomial(oIndex_tab);
    if (Zheg_pol.length) {
        document.write("Полином Жегалкина: " + Zheg_pol + "<br>");
        funct_checking(Zheg_pol, F_var);
    } else document.write("Нет Полинома Жегалкина.<br>");

    class_T0 = checing_superposition(funct, 0, 0, 0, 0);
    class_T1 = checing_superposition(funct, 1, 1, 1, 1);
    class_M = checing_monotony(monotony_member);
    class_L = checing_linearity(Zheg_pol);

    Object.assign(classes_of_funct, { T0 : class_T0,
    T1 : class_T1,
    S : class_S,
    M : class_M,
    L : class_L});
    console.log(classes_of_funct);
}

function checing_superposition (funct, F, x, y, z) {
    if ((eval(funct)+0) == F) {
            return "+";
    }
    return "-";
}

function checing_self_duality1 (funct, F, x, y, z) {
    let F_negative = eval(funct) + 0;
    if (F === !F_negative) return "+";
    return "-";
}

// function checing_self_duality2 (funct, x, y, z) {
//     let F = eval(funct) + 0;
//     x = !x; y = !y; if (z != undefined) z = !z;
//     let F_negative = eval(funct) + 0;
//     if (F === !F_negative) return "+";
//     return "-";
// }

function checing_monotony (monotony_member) {
    for (let i in monotony_member) {
        for (let j = i; j <= monotony_member.length - 1; j++) {
            if (monotony_member[i].slice(0, 3) <= monotony_member[j].slice(0, 3) &&
            monotony_member[i][3] >= monotony_member[j][3]) return "-";
        }
    }
    return "+";
}

function checing_linearity (Zheg_pol) {
    if (Zheg_pol.includes("Λ")) return "-";
    return "+";
}

function complete_of_system (classes_of_funct) {
    comp_sys = {};//Object.assign({}, classes_of_funct[0]);
    //for (let key in comp_sys) Object.assign(comp_sys, {[key] : "-"});
    console.log(classes_of_funct);
    let count;
    for (let i in classes_of_funct[0]) {
        count = 0;
        for (let j in classes_of_funct) {
            // console.log(classes_of_funct[j]);
            // console.log(Object.values(classes_of_funct[j]));
            // console.log((Object.values(classes_of_funct[j]))[i] );
            if ((Object.values(classes_of_funct[j]))[count] == "-") {
                Object.assign(comp_sys, {[i] : "+"});
            }
            count++;
        }
    }
    let compl_sys = "+";
    if ((Object.values(comp_sys)).includes("-")) compl_sys = "-";
    return compl_sys;
}

function str_generation (str, x, y, z){
    if (x == 0 && y == 0 && (z == 0 || z == undefined)) str = str.concat(0);
    if (x == 1) str = str.concat(1);
    if (y == 1) str = str.concat(2);
    if (z == 1) str = str.concat(3);
    return str;
}

function index_calcul (F_var, oIndex_tab) {
    let F_var_demo = F_var.slice(0, F_var.length);
    console.log(F_var.join(" "));
    let tap = F_var_demo.length;
    for (let key in oIndex_tab){
        Object.assign(oIndex_tab, {[key] : F_var_demo[0]});
        for (let i = 0; i <= F_var_demo.length - 1; i++)
        F_var_demo[i] = F_var_demo[i] ^ F_var_demo[i+1];
        F_var_demo = F_var_demo.slice(0, F_var_demo.length - 1);
        const tp = " ";
        console.log(tp.repeat(tap - F_var_demo.length) + F_var_demo.join(" "));
    }
    console.log(oIndex_tab);
}

function funct_checking (funct, F_var) {
    let check = funct;
    check = create_people_mean_funct(check);
    check = create_Funtcion(check);
    let chk = [];
    for (x = 0; x <= 1; x++){
        for (y = 0; y <= 1; y++){
            if (check.includes('z') != false){
                for (z = 0; z <= 1; z++){
                    chk.push(eval(check) + 0);
                }
            } else {
                chk.push(eval(check) + 0);
                
            }
        }
    }
    let chck = 0;
    for (let i in chk) {
        if (chk[i] === F_var[i]) continue;
        else chck = 1;
    }
    if (chck === 0) document.write("Проверка успешна: " + chk + "<br>");
    else {
        document.write("Функции не совпали<br>");
        console.log("Значения исходной функции: " + F_var);
        console.log("Значения проверяемой функции: " + chk);
    }
}

function create_Funtcion (funct) {
    funct = funct.replaceAll(" ", "");
    funct = funct.replaceAll("-", "!");
    funct = funct.replaceAll("I", "i");
    funct = funct.replaceAll("i", "|");
    funct = funct.replaceAll("Y", "↓");

    let sym1 = "|", sym2 = "↓", tmp;
    if (funct.indexOf(sym1) > funct.indexOf(sym2)) {
        tmp = sym1;
        sym1 = sym2;
        sym2 = tmp;
    }
    funct = anti_staples(funct, sym1);
    funct = anti_staples(funct, sym2);
    
    funct = funct.replaceAll("→", "<=");
    funct = funct.replaceAll("~", "==");
    funct = funct.replaceAll("Λ", "&");
    funct = funct.replaceAll("V", "|");

    funct = funct.replaceAll("⊕", "^");
    
    console.log("Логическое (машинное) представление: " + funct);
    return funct;
}

function anti_staples(funct, symbol) {
    while (funct.includes(symbol)){
        let x = funct.slice(funct.indexOf(symbol) - 1, funct.indexOf(symbol));
        let y = funct.slice(funct.indexOf(symbol) + 1, funct.indexOf(symbol) + 2);
        if (x.includes(")")) {
            while ((x.match(/\)/g) || []).length != (x.match(/\(/g) || []).length) {
                for (let i = funct.indexOf(symbol) - x.length - 1; i >= 0; i--) {
                    if (funct[i] == "("){
                        x = funct.slice(i, funct.indexOf(symbol));
                        break;
                    }
                }
            }
        }
        if (funct[funct.indexOf(x) - 1] == "!") {
            x = funct.slice(funct.indexOf(x) - 1, funct.indexOf(x) + x.length)
        }
        if (y.includes("!")) {
            y = funct.slice(funct.indexOf(y), funct.indexOf(y) + 2)
        }
        if (y.includes("(")) {
            while ((y.match(/\(/g) || []).length != (y.match(/\)/g) || []).length) {
                y = funct.slice(funct.indexOf(y), funct.indexOf(")", funct.indexOf(y)) + y.length);
            }
        }
        let chr;
        if (symbol.includes("|")) {
            chr = "Λ";
        } else {
            chr = "V";
        }
        funct = funct.replace(funct.slice(funct.indexOf(x, funct.indexOf(symbol) - funct.slice(0, x.length + 2)),
        funct.indexOf(y, funct.indexOf(symbol)) + y.length), `!(${x}${chr}${y})`);
    }
    return funct;
}

function create_people_mean_funct (funct) {

    funct = funct.replaceAll("A", "a");
    funct = funct.replaceAll("a", "Λ");

    funct = funct.replaceAll("v", "V");

    funct = funct.replaceAll("O", "o");
    funct = funct.replaceAll("o", "⊕");
    funct = funct.replaceAll("I", "i");
    funct = funct.replaceAll("i", "|");
    funct = funct.replaceAll("Y", "↓");
    funct = funct.replaceAll("=>", "→");
    funct = funct.replaceAll("=", "~");

    return funct;
}


function create_PNF (F, count, x, y, z){
    let x1, y1, z1;
    //СДНФ
    if (count === 1){
        if (F === 1){     
            if (x === 1) {
                x1 = "x";
            } else {
                x1 = "-x";
            }
            if (y === 1) {
                y1 = "y";
            } else {
                y1 = "-y";
            }
            if (z === 1) {
                z1 = "z";
            } else if (z === 0){
                z1 = "-z";
            } else {
                z1 = "";
            }
        } else {
        return "";
        }
    }
    //СКНД
    else if (count === 0){
        if (F === 0){     
            if (x === 1) {
                x1 = "-x";
            } else {
                x1 = "x";
            }
            if (y === 1) {
                y1 = "-y";
            } else {
                y1 = "y";
            }
            if (z === 1) {
                z1 = "-z";
            } else if (z === 0){
                z1 = "z";
            } else {
                z1 = "";
            }
        } else {
        return "";
        }
    } else {
        return "";
    }
    let chr1, chr2;
    if (count === 1){
        chr1 = "Λ";
        chr2 = "V";
    } else if (count === 0){
        chr1 = "V";
        chr2 = "Λ";
    }
    PF = "(" + x1 + chr1 + y1;
    if (z != undefined) {
        PF = PF + chr1 + z1;
    } 
    PF = PF + ")" + chr2;
    return PF;
}

function create_Zhegalkin_polynomial (index_tab) {
    let str = "";
    for (let key in index_tab){
        let con = "", mod = "⊕";
        if (index_tab[key] == 1){
            if (key.length > 2){
                con = "Λ";
            }
            if (key.includes("0")) {
                str += index_tab[key];
            } 
            if (key.includes("1")) {
                str += "x" + con;
            } if (key.includes("2")) {
                str += "y" + con;
            } if (key.includes("3")) {
                str += "z";
            }
            if (str[str.length-1] == "Λ"){
                str = str.slice(0, str.length-1);
            }
            str += mod;
        }
    }
    return str.slice(0, str.length-1);
}

menu();

function menu () {
    let value = prompt("1. Калькулятор\n2. Функции по заданию\n9. Проверки всякого.\n404. Выход");
    let funct, people_funct, mach_funct;

    switch(+value){
        case 1:
            funct = prompt("Y - стрелка Пирса (↓), I - штрих Щеффера (|),\nO - сумма по модулю 2 (⊕), " +
            "A - конъюнкция (Λ),\nV - дизъюнкция, => - имплекация (→), - ялвяется отрицанием\nВаша функция: ");
            people_funct = create_people_mean_funct(funct);
            document.write("Введено: " + people_funct + "<br>");
            mach_funct = create_Funtcion(people_funct);
            fun_working(mach_funct);
            break;
        case 2:
            const dict = [
                "x => (y = x)", "(-x v y)=(-y A x)", "(x o -y) o (x = (x => y))",
                "(x o y) = z", "x Y (-y o -x) = z", "-x o (y v -z) = (x = -y)"
            ];
            let classes_of_functs = [
                {}, {}, {},
                {}, {}, {}
            ];
            let count = 0;
            for (let key in dict) {
                count++;
                funct = dict[key];
                people_funct = create_people_mean_funct(funct);
                document.write("Функция " + (Number(key) + 1 ) + ": " + people_funct + "<br>");
                console.log("Функция " + (Number(key) + 1 ));
                mach_funct = create_Funtcion(people_funct);
                fun_working(mach_funct, classes_of_functs[key])
                if (count % 3 == 0) {
                    document.write("Таблица классов:<br>T0  T1  S  M  L<br>");
                    for (let key1 = count - 3; key1 < count; key1++) {
                        if ( count == 6 && key1 == 3) {      
                            document.write("-, -, +, -, +<br>");
                            continue;
                        } else {
                            document.write((Object.values(classes_of_functs[key1])).join(", ") + "<br>");
                        }
                    }
                    complete_system_functs = complete_of_system(classes_of_functs.slice(count - 3, count));
                    document.write("Система ");
                    if (complete_system_functs == "-") document.write("не");
                    document.write("полная<br>");
                }

                document.write("<br>");
                console.log(count);
            }
        break;
        case 9:
            count = 1;
            for (let x = 0; x <= 1; x++){
                for (let y = 0; y <= 1; y++) {
                    console.log(eval(1^x^x&y) + " " + count);
                    count++;
                }
            }
        break;
        
        case 404:
            return 0;
            break;
        default:
            alert("Неверное значение");
            menu();
            break;
    }
}
