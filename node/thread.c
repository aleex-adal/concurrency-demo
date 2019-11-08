#include <stdio.h>
#include <pthread.h>
#include <stdlib.h> 
#include <time.h>
#include <math.h>
#include <unistd.h>

#define NUM 10

int workload[NUM];
int ind;
pthread_mutex_t m = PTHREAD_MUTEX_INITIALIZER;

void printWorkload(int num) {
    printf("Workload: [ ");
    for (int i = 0; i < num; i++) {
        printf("%d ", workload[i]);
    }
    printf("]\n");
}

void *workerFunc(void *arg) {
    while (ind >= 0) {
        pthread_mutex_lock(&m);
            int wait = workload[ind--];
        pthread_mutex_unlock(&m);
            printf("thread %d received %d seconds of work\n", *((int *) arg), wait);
            sleep(wait);
    }
    pthread_mutex_lock(&m);
        if (ind == -1) {
            ind--;
        }
    pthread_mutex_unlock(&m);
}

int main() {
    srand(time(0));
    ind = NUM - 1;

    pthread_t tid;
    pthread_t tid2;

    pthread_attr_t tattr;
    pthread_attr_init(&tattr);
    pthread_attr_setdetachstate(&tattr, PTHREAD_CREATE_DETACHED);

    for (int i = 0; i < NUM; i++) {
        workload[i] = round((rand() / (float) RAND_MAX) * 5);
    }

    printWorkload(NUM);

    int id1 = 0;
    int id2 = 1;

    pthread_create(&tid, &tattr, workerFunc, &id1);
    pthread_create(&tid2, &tattr, workerFunc, &id2);
    while (ind > -2) {
        ;
    }

    printWorkload(0);
    printf("index: %d\n", ind);

    pthread_mutex_destroy(&m);
}