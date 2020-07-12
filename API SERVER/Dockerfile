FROM python:slim-buster
COPY src/ /home/app
WORKDIR /home/app
RUN pip install -r "requirements.txt"
RUN pwd /home/app
RUN mkdir temp_storage
RUN ls
EXPOSE 5001 
ENTRYPOINT [ "python" ] 
CMD [ "index.py" ] 
