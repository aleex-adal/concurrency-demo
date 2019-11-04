#include <stdio.h>
#include <pthread.h>
#include <stdlib.h> 
#include <time.h>
#include <math.h>
#include <unistd.h>

int workload[10];
int ind;
pthread_mutex_t m = PTHREAD_MUTEX_INITIALIZER;

void *workerFunc(void *arg) {
    while (ind < 10) {
        pthread_mutex_lock(&m);
            int wait = workload[ind++];
        pthread_mutex_unlock(&m);
            printf("thread %d working for %d seconds\n", *((int *) arg), wait);
            sleep(wait);
    }
}

int main() {
    srand(time(0));
    ind = 0;

    pthread_t tid;
    pthread_t tid2;

    pthread_attr_t tattr;
    pthread_attr_init(&tattr);
    pthread_attr_setdetachstate(&tattr, PTHREAD_CREATE_JOINABLE);

    for (int i = 0; i < 10; i++) {
        workload[i] = round((rand() / (float) RAND_MAX) * 5);
    }

    printf("Workload: [ ");
    for (int i = 0; i < 10; i++) {
        printf("%d ", workload[i]);
    }
    printf("]\n");

    int id1 = 0;
    int id2 = 1;

    pthread_create(&tid, &tattr, workerFunc, &id1);
    pthread_create(&tid2, &tattr, workerFunc, &id2);
    pthread_join(tid, 0);
    pthread_join(tid2, 0);
    pthread_mutex_destroy(&m);
}