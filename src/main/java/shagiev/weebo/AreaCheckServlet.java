package shagiev.weebo;

import shagiev.weebo.beans.ResponseBean;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.LinkedList;

@WebServlet("/check")
public class AreaCheckServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        long start = System.nanoTime();

        String timeOffset = req.getParameter("time-offset");
        String date = new SimpleDateFormat("HH:mm:ss dd.MM.yyyy").format(Calendar.getInstance().getTime());

        String x = req.getParameter("x");
        String y = req.getParameter("y");
        String r = req.getParameter("r");

        ServletContext context = getServletContext();

        Object historyAttribute = context.getAttribute("history");
        LinkedList<ResponseBean> history;

        if (historyAttribute != null) {
            if (historyAttribute instanceof LinkedList
                    && !((LinkedList<?>) historyAttribute).isEmpty()
                    && ((LinkedList<?>) historyAttribute).getFirst() instanceof ResponseBean) {
                history = (LinkedList<ResponseBean>) historyAttribute;
            } else {
                System.out.println("Can't cast history list");
                history = new LinkedList<>();
            }
        } else {
            history = new LinkedList<>();
        }

        long executionTime = System.nanoTime() - start;

        try {
            ResponseBean responseBean = new ResponseBean();
            responseBean.setX(Double.parseDouble(x));
            responseBean.setY(Double.parseDouble(y));
            responseBean.setR(Double.parseDouble(r));
            responseBean.setCurrentTime(date);
            responseBean.setExecutionTime(executionTime);
            responseBean.setResult(hit(Double.parseDouble(x), Double.parseDouble(y), Double.parseDouble(r)));
            history.add(responseBean);
        } catch (NumberFormatException e) {
            System.out.println("Can't parse numbers");
        }

        context.setAttribute("history", history);

        req.getRequestDispatcher("/index.jsp").forward(req, resp);
    }

    private boolean hitRectangle(double x, double y, double r) {
        return (x >= 0 && x <= r / 2) && (y >= 0 && y <= r);
    }

    private boolean hitTriangle(double x, double y, double r) {
        return (x <= 0 && x >= - (2 * y + r)) && (y <= 0 && y >= - (0.5 * x + 0.5 * r));
    }

    private boolean hitSector(double x, double y, double r) {
        return (x <= 0
                && (x * x <= ((r * r * 0.25) - (y * y))))
                && (y >= 0
                && (y * y <= ((r * r * 0.25) - (x * x))));
    }

    private boolean hit(double x, double y, double r) {
        return hitRectangle(x, y, r) || hitTriangle(x, y, r) || hitSector(x, y, r);
    }
}
