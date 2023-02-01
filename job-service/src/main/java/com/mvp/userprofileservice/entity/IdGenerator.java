package com.mvp.userprofileservice.entity;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class IdGenerator implements IdentifierGenerator {

    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object object)
            throws HibernateException {

        String prefix = "JOB98";
        Connection connection = session.connection();

        try {
            Statement statement=connection.createStatement();
            ResultSet rs=statement.executeQuery("select count(id) as Id from job_form");
            if(rs.next()){
                int id=rs.getInt(1)+101;
                System.out.print(id);
                String generatedId = prefix + new Integer(id).toString();
                return generatedId;

            }


        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }

}
