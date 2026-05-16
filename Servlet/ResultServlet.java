import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class ResultServlet extends HttpServlet
{
    public void doPost(HttpServletRequest request,
                       HttpServletResponse response)
                       throws ServletException, IOException
    {

        response.setContentType("text/html");

        PrintWriter out = response.getWriter();

        String roll = request.getParameter("roll");
        String name = request.getParameter("name");

        String s1 = request.getParameter("s1");
        String s2 = request.getParameter("s2");
        String s3 = request.getParameter("s3");

        int m1 = Integer.parseInt(request.getParameter("m1"));
        int m2 = Integer.parseInt(request.getParameter("m2"));
        int m3 = Integer.parseInt(request.getParameter("m3"));

        String r1, r2, r3;

        if(m1 >= 40)
            r1 = "PASS";
        else
            r1 = "FAIL";

        if(m2 >= 40)
            r2 = "PASS";
        else
            r2 = "FAIL";

        if(m3 >= 40)
            r3 = "PASS";
        else
            r3 = "FAIL";

        int total = m1 + m2 + m3;

        double percentage = total / 3.0;

        String finalResult;

        if(m1 < 40 || m2 < 40 || m3 < 40)
            finalResult = "FAIL";
        else
            finalResult = "PASS";

        out.println("<html><body>");

        out.println("<h2>Student Result</h2>");

        out.println("Roll Number: " + roll + "<br><br>");
        out.println("Student Name: " + name + "<br><br>");

        out.println(s1 + " : " + m1 + " - " + r1 + "<br><br>");
        out.println(s2 + " : " + m2 + " - " + r2 + "<br><br>");
        out.println(s3 + " : " + m3 + " - " + r3 + "<br><br>");

        out.println("Total Marks: " + total + "<br><br>");
        out.println("Percentage: " + percentage + "%<br><br>");

        out.println("<h3>Final Result: " + finalResult + "</h3>");
	out.println("<hr>");
	out.println("<footer>");
	out.println("<center>");
	out.println("Copyright © 24071A05E1");
	out.println("</center>");
	out.println("</footer>");

        out.println("</body></html>");
    }
}