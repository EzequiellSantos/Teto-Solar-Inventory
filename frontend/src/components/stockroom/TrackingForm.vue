= (SOMASES(Vendas!$D$2:$D$700; Vendas!$L$2:$L$700; "Luiz"; Vendas!$B$2:$B$700; ">=" & $A2; Vendas!$D$2:$D$700; "<" & DATA(ANO($A2); MÊS($A2) + 1; 1); Vendas!$M$2:$M$700; "PAGO") +

SOMASES(Vendas!$D$2:$D$700; Vendas!$L$2:$L$700; "Luiz"; Vendas!$B$2:$B$700; ">=" & $A2; Vendas!$D$2:$D$700; "<" & DATA(ANO($A2); MÊS($A2) + 1; 1); Vendas!$M$2:$M$700; "PAGO 50%")) *
PROCV("Luiz"; Taxas!$A$2:$B$700; 2; FALSO) +

(SOMASES(Vendas!$D$2:$D$700; Vendas!$L$2:$L$700; "Andreza"; Vendas!$D$2:$D$700; ">=" & $A2; Vendas!$D$2:$D$700; "<" & DATA(ANO($A2); MÊS($A2) + 1; 1); Vendas!$M$2:$M$700; "PAGO") +

SOMASES(Vendas!$D$2:$D$700; Vendas!$L$2:$L$700; "Andreza"; Vendas!$D$2:$D$700; ">=" & $A2; Vendas!$D$2:$D$700; "<" & DATA(ANO($A2); MÊS($A2) + 1; 1); Vendas!$M$2:$M$700; "PAGO 50%")) *
0,015 +

(SOMASES(Vendas!$D$2:$D$700; Vendas!$L$2:$L$700; "Ítalo"; Vendas!$D$2:$D$700; ">=" & $A2; Vendas!$D$2:$D$700; "<" & DATA(ANO($A2); MÊS($A2) + 1; 1); Vendas!$M$2:$M$700; "PAGO") +

SOMASES(Vendas!$D$2:$D$700; Vendas!$L$2:$L$700; "Ítalo"; Vendas!$D$2:$D$700; ">=" & $A2; Vendas!$D$2:$D$700; "<" & DATA(ANO($A2); MÊS($A2) + 1; 1); Vendas!$M$2:$M$700; "PAGO 50%")) *
0,015
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* Teste  */

=(SOMASES(Vendas!$C$3:$C$700; Vendas!$A$3:$A$700; "Luiz"; Vendas!$B$3:$B$700; ">=" & $A4; Vendas!$B$3:$B$700; "<" & DATA(ANO($A4); MÊS($A4) + 1; 1); Vendas!$D$2:$D$700; "PAGO") +

   SOMASES(Vendas!$C$3:$C$700; Vendas!$A$3:$A$700; "Luiz"; Vendas!$B$3:$B$700; ">=" & $A4; Vendas!$B$3:$B$700; "<" & DATA(ANO($A4); MÊS($A4) + 1; 1); Vendas!$D$2:$D$700; "PAGO 50%")) *
   PROCV("Luiz"; Taxas!$A$2:$B$700; 2; FALSO) +

  (SOMASES(Vendas!$C$3:$C$700; Vendas!$A$3:$A$700; "Andreza"; Vendas!$B$3:$B$700; ">=" & $A4; Vendas!$B$3:$B$700; "<" & DATA(ANO($A4); MÊS($A4) + 1; 1); Vendas!$D$2:$D$700; "PAGO") +
   SOMASES(Vendas!$C$3:$C$700; Vendas!$A$3:$A$700; "Andreza"; Vendas!$B$3:$B$700; ">=" & $A4; Vendas!$B$3:$B$700; "<" & DATA(ANO($A4); MÊS($A4) + 1; 1); Vendas!$D$2:$D$700; "PAGO 50%")) *
   0,015 +

  (SOMASES(Vendas!$C$3:$C$700; Vendas!$A$3:$A$700; "Ítalo"; Vendas!$B$3:$B$700; ">=" & $A4; Vendas!$B$3:$B$700; "<" & DATA(ANO($A4); MÊS($A4) + 1; 1); Vendas!$D$2:$D$700; "PAGO") +
   SOMASES(Vendas!$C$3:$C$700; Vendas!$A$3:$A$700; "Ítalo"; Vendas!$B$3:$B$700; ">=" & $A4; Vendas!$B$3:$B$700; "<" & DATA(ANO($A4); MÊS($A4) + 1; 1); Vendas!$D$2:$D$700; "PAGO 50%")) *

