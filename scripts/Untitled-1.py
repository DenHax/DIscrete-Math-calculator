while True:
    sdnf = 'F(x,y) = '
    sknf = 'F(x,y) = '
    math = input('Введите порядковый номер выражения \n')
    match math:
        case '1':
            print('x y F(x,y)')
            for x in range(2):
                for y in range(2):
                    F = x == ( y & x )
                    if F: #SDNF
                        if x == 1:
                            sdnf += '(x and '
                        else:
                            sdnf = sdnf + '(not(x) and '
                        if y == 1:
                            sdnf = sdnf + 'y)or'
                        else:
                            sdnf = sdnf + 'not(y))or'
                            
                            
                    if F: #Func
                        print (x, y, "1")
                    else:
                        print (x, y, "0")
                        
                        
                    if not F: #SKNF
                        if x == 1:
                            sknf = sknf + '(not(x) or '
                        else:
                            sknf = sknf + '(x or '
                        if y == 1:
                            sknf = sknf + 'not(y))and'
                        else:
                            sknf = sknf + 'y)and'
                            
            print ("СДНФ: ", sdnf[:-2])
            print ("СКНФ: ", sknf[:-3])
        case '2':
            print('x y F(x,y)')
            for x in range(2):
                for y in range(2):
                    F = (not x) or ( (not y) is x ) == y
                    if F: #SDNF
                        if x == 1:
                            sdnf += '(x and '
                        else:
                            sdnf = sdnf + '(not(x) and '
                        if y == 1:
                            sdnf = sdnf + 'y)or'
                        else:
                            sdnf = sdnf + 'not(y))or'
                            
                            
                    if F: #Func
                        print (x, y, "1")
                    else:
                        print (x, y, "0")
                        
                        
                    if not F: #SKNF
                        if x == 1:
                            sknf = sknf + '(not(x) or '
                        else:
                            sknf = sknf + '(x or '
                        if y == 1:
                            sknf = sknf + 'not(y))and'
                        else:
                            sknf = sknf + 'y)and'
                            
            print ("СДНФ: ", sdnf[:-2])
            print ("СКНФ: ", sknf[:-3])
        case '3':
            print('x y F(x,y)')
            for x in range(2):
                for y in range(2):
                    F = (x & (not y) ) == (x is ((not x) and y))
                    if F: #SDNF
                        if x == 1:
                            sdnf += '(x and '
                        else:
                            sdnf = sdnf + '(not(x) and '
                        if y == 1:
                            sdnf = sdnf + 'y)or'
                        else:
                            sdnf = sdnf + 'not(y))or'
                            
                            
                    if F: #Func
                        print (x, y, "1")
                    else:
                        print (x, y, "0")
                        
                        
                    if not F: #SKNF
                        if x == 1:
                            sknf = sknf + '(not(x) or '
                        else:
                            sknf = sknf + '(x or '
                        if y == 1:
                            sknf = sknf + 'not(y))and'
                        else:
                            sknf = sknf + 'y)and'
                            
            print ("СДНФ: ", sdnf[:-2])
            print ("СКНФ: ", sknf[:-3])
        case '4':
            print('x y F(x,y)')
            for x in range(2):
                for y in range(2):
                    for z in range(2):
                        F = (x & z) is y
                        if F: #SDNF
                            if x == 1:
                                sdnf += '(x and '
                            else:
                                sdnf = sdnf + '(not(x) and '
                            if y == 1:
                                sdnf = sdnf + 'y)or'
                            else:
                                sdnf = sdnf + 'not(y))or'
                            
                            
                        if F: #Func
                            print (x, y, z, "1")
                        else:
                            print (x, y, z, "0")
                        
                        
                        if not F: #SKNF
                            if x == 1:
                                sknf = sknf + '(not(x) or '
                            else:
                                sknf = sknf + '(x or '
                            if y == 1:
                                sknf = sknf + 'not(y))and'
                            else:
                                sknf = sknf + 'y)and'
                            
            print ("СДНФ: ", sdnf[:-2])
            print ("СКНФ: ", sknf[:-3])
        case '5':
            print('x y F(x,y)')
            for x in range(2):
                for y in range(2):
                    for z in range(2):
                        F = x and (y & z) == (not y)
                        if F: #SDNF
                            if x == 1:
                                sdnf += '(x and '
                            else:
                                sdnf = sdnf + '(not(x) and '
                            if y == 1:
                                sdnf = sdnf + 'y)or'
                            else:
                                sdnf = sdnf + 'not(y))or'
                            
                            
                        if F: #Func
                            print (x, y, z, "1")
                        else:
                            print (x, y, z, "0")
                        
                        
                        if not F: #SKNF
                            if x == 1:
                                sknf = sknf + '(not(x) or '
                            else:
                                sknf = sknf + '(x or '
                            if y == 1:
                                sknf = sknf + 'not(y))and'
                            else:
                                sknf = sknf + 'y)and'
                            
            print ("СДНФ: ", sdnf[:-2])
            print ("СКНФ: ", sknf[:-3])
        case '6':
            print('x y F(x,y)')
            for x in range(2):
                for y in range(2):
                    for z in range(2):
                        F = (not(x or (not z))) is (z or y) & (not y)
                        if F: #SDNF
                            if x == 1:
                                sdnf += '(x and '
                            else:
                                sdnf = sdnf + '(not(x) and '
                            if y == 1:
                                sdnf = sdnf + 'y)or'
                            else:
                                sdnf = sdnf + 'not(y))or'
                            
                            
                        if F: #Func
                            print (x, y, z, "1")
                        else:
                            print (x, y, z, "0")
                        
                        
                        if not F: #SKNF
                            if x == 1:
                                sknf = sknf + '(not(x) or '
                            else:
                                sknf = sknf + '(x or '
                            if y == 1:
                                sknf = sknf + 'not(y))and'
                            else:
                                sknf = sknf + 'y)and'
                            
            print ("СДНФ: ", sdnf[:-2])
            print ("СКНФ: ", sknf[:-3])
        case _:
            print('Отсутствует выражение под этим номером')
            break

