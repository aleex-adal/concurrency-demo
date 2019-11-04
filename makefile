all: eventloop.c thread.c	
	gcc -o eventloop eventloop.c
	gcc -o thread thread.c

clean:	
	rm eventloop.exe thread.exe