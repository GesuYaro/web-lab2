package shagiev.weebo;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/controller")
public class ControllerServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String xString = req.getParameter("x");
        String yString = req.getParameter("y");
        String rString = req.getParameter("r");

        Double x = null;
        Double y = null;
        Double r = null;

        if (xString != null && yString != null && rString != null) {
            try {
                x = Double.parseDouble(xString);
                y = Double.parseDouble(yString);
                r = Double.parseDouble(rString);
            } catch (NumberFormatException ignored) {}
        }

        RequestDispatcher requestDispatcher;

        if (x != null && y != null && r != null) {
            requestDispatcher = req.getRequestDispatcher("/check");
        } else {
            requestDispatcher = req.getRequestDispatcher("/index.jsp");
        }

        requestDispatcher.forward(req, resp);
    }
}
