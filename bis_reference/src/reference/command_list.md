# BIS Command Reference

| Format                                       | Params                                                         | Notes |
| -------------------------------------------- | -------------------------------------------------------------- | ----- |
| `@LDV[,o] v=vld[,v=vld,...,v=vld]`           | o=options, v=variable, vld=value                               |       |
| `@LDV,o v[,v,...,v]`                         | o=options, v=variable                                          |       |
| `@LDV,Q rv=iv,n[(delim),rv=iv,n(delim),...]` | rv=receiving var, iv=source var, n=skip count, delim=delimiter |       |
| `@CHG v {exp\|vld}`                          | v=variable, exp=expression, vld=value                          |       |
| `@CHG rw v[,v,...,v]`                        | rw=reserved word, v=variable                                   |       |
| `@LDA[,o] v[n][=vld,...,vld]`                | o=options, v=variable, [n]=member count, vld=value             |       |
| `@LDA[,o] v[n][,v[n],...,v[n]]`              | o=options, v=variable, [n]=member count                        |       |
| `@CLV[{,o \| ,startv,q}]`                    | o=options, startv=first var number, q=count                    |       |
| `@INC[,n] v[,v,...,v]`                       | n=increment amount, v=variable                                 |       |
