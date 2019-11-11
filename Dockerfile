FROM node as build
WORKDIR /frontend
COPY ./app/frontend ./
RUN yarn
RUN yarn build

FROM python
COPY ./app/backend /backend
COPY --from=build /frontend/build /backend/app/www
WORKDIR /backend
RUN pip install -r requirements.txt
CMD python3 app/app.py